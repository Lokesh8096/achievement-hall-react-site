import { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useStudents } from "@/hooks/useStudents";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Plus, Upload, Download, Edit, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getHackathonOptions, getHackathonName } from "@/lib/hackathons";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteAllStudents,
  } = useStudents();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newStudent, setNewStudent] = useState({
    name: "",
    image_url: "",
    score: 0,
    team_name: "",
    project_link: "",
    hackathon_count: 1,
    college: "",
  });

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600 mt-2">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addStudent(newStudent);
    if (result.error === null) {
      setNewStudent({
        name: "",
        image_url: "",
        score: 0,
        team_name: "",
        project_link: "",
        hackathon_count: 1,
        college: "",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedStudents) {
      await deleteStudent(id);
    }
    setSelectedStudents([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(students.map((s) => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, id]);
    } else {
      setSelectedStudents(selectedStudents.filter((sid) => sid !== id));
    }
  };

  const downloadCSVTemplate = () => {
    const csvContent = "name,image_url,score,team_name,project_link,hackathon_count,college\n";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileSelect = (file: File) => {
    if (file.type === "text/csv" || file.name.endsWith('.csv')) {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} has been selected for upload.`,
      });
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please select a CSV file.",
        variant: "destructive",
      });
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUploadCSV = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a CSV file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const csv = event.target?.result as string;
        const lines = csv.split("\n");
        const headers = lines[0].split(",");

        let successCount = 0;
        let duplicateCount = 0;
        let errorCount = 0;
        const duplicateStudents: string[] = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",");
          if (values.length >= 6 && values[0]) {
            const studentData: any = {
              name: values[0],
              image_url: values[1] || "",
              score: parseInt(values[2]) || 0,
              team_name: values[3],
              project_link: values[4] || "",
              hackathon_count: parseInt(values[5]) || 1,
            };
            // Add college if it exists in CSV (column 7 or index 6)
            if (values.length > 6 && values[6]) {
              studentData.college = values[6].trim() || null;
            }
            const result = await addStudent(studentData);
            if (result.error === null) {
              successCount++;
            } else if (result.error?.message === 'Duplicate student') {
              duplicateCount++;
              duplicateStudents.push(`${studentData.name} (${studentData.team_name})`);
            } else {
              errorCount++;
            }
          }
        }

        setIsUploading(false);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Show detailed results
        let description = `Successfully imported ${successCount} students`;
        if (duplicateCount > 0) {
          description += `, ${duplicateCount} duplicates skipped`;
        }
        if (errorCount > 0) {
          description += `, ${errorCount} errors`;
        }

        toast({
          title: "CSV Upload Complete",
          description: description,
        });

        // If there were duplicates, show them in a separate toast
        if (duplicateCount > 0) {
          setTimeout(() => {
            toast({
              title: "Duplicates Found",
              description: `Skipped duplicates: ${duplicateStudents.slice(0, 3).join(', ')}${duplicateStudents.length > 3 ? ` and ${duplicateStudents.length - 3} more` : ''}`,
              variant: "default",
            });
          }, 1000);
        }
      };
      reader.readAsText(selectedFile);
    } catch (error) {
      setIsUploading(false);
      toast({
        title: "Upload Error",
        description: "An error occurred while processing the CSV file.",
        variant: "destructive",
      });
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-16">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage students and team data</p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Add Student</CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>
                      Fill in the student details below.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddStudent} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newStudent.name}
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        value={newStudent.image_url}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            image_url: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="score">Score</Label>
                      <Input
                        id="score"
                        type="number"
                        min="0"
                        max="100"
                        value={newStudent.score}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            score: parseInt(e.target.value) || 0,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="team_name">Team Name</Label>
                      <Input
                        id="team_name"
                        value={newStudent.team_name}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            team_name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="project_link">Project Link</Label>
                      <Input
                        id="project_link"
                        value={newStudent.project_link}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            project_link: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="hackathon_count">Hackathon</Label>
                      <select
                        id="hackathon_count"
                        value={newStudent.hackathon_count}
                        onChange={e => setNewStudent({ ...newStudent, hackathon_count: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 rounded border border-gray-300 text-black"
                        required
                      >
                        {getHackathonOptions().map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="college">College (Optional)</Label>
                      <Input
                        id="college"
                        value={newStudent.college}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            college: e.target.value,
                          })
                        }
                        placeholder="Enter college name"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Add Student
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">CSV Upload</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Drag and Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-2">
                    <FileText className="h-8 w-8 mx-auto text-green-600" />
                    <p className="text-sm font-medium text-gray-900">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearSelectedFile}
                      className="mt-2"
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="text-sm font-medium text-gray-900">
                      Drop CSV file here
                    </p>
                    <p className="text-xs text-gray-500">
                      or click to browse files
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2"
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Upload Button */}
              <Button
                onClick={handleUploadCSV}
                disabled={!selectedFile || isUploading}
                className="w-full mt-3"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload CSV
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={downloadCSVTemplate}
                className="w-full mt-2"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Bulk Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    disabled={selectedStudents.length === 0}
                    className="w-full mb-2"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete Selected Students
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {selectedStudents.length}{" "}
                      selected students? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteSelected}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete All Students</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete ALL students? This action
                      cannot be undone and will remove all student data
                      permanently.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteAllStudents}>
                      Delete All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Students ({students.length})</CardTitle>
            <CardDescription>Manage all student records</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={
                          selectedStudents.length === students.length &&
                          students.length > 0
                        }
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Hackathon</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={(e) =>
                            handleSelectStudent(student.id, e.target.checked)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.team_name}</TableCell>
                      <TableCell>{student.score}</TableCell>
                      <TableCell>{getHackathonName(student.hackathon_count)}</TableCell>
                      <TableCell>{student.college || "-"}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Student
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {student.name}
                                  ? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteStudent(student.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

