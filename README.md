#SQL queries for Table creation.

CREATE TABLE Students (
    StudentID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    ContactPerson VARCHAR(255),
    ContactNo VARCHAR(20) NOT NULL,
    EmailAddress VARCHAR(255) NOT NULL,
    DateOfBirth DATE NOT NULL,
    ClassroomID INT,
    FOREIGN KEY (ClassroomID) REFERENCES Classroom(ClassroomID)
);

CREATE TABLE Classroom (
    ClassroomID INT PRIMARY KEY IDENTITY(1,1),
    ClassName VARCHAR(255) NOT NULL
);

CREATE TABLE Teachers (
    TeacherId INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255),
    ContactNo INT NOT NULL,
    EmailAddress VARCHAR(255) NOT NULL
);

CREATE TABLE Subjects (
    SubjectId INT PRIMARY KEY IDENTITY(1,1),
    SubjectName VARCHAR(255) NOT NULL
);

CREATE TABLE AllocateSubjects (
    AllocateSubjectId INT PRIMARY KEY IDENTITY(1,1),
    TeacherId INT NOT NULL,
    SubjectId INT NOT NULL,
    FOREIGN KEY (TeacherId) REFERENCES Teachers(TeacherId),
    FOREIGN KEY (SubjectId) REFERENCES Subjects(SubjectId)
);

CREATE TABLE AllocateClassrooms (
    AllocateClassroomId INT PRIMARY KEY IDENTITY(1,1),
    TeacherId INT NOT NULL,
    ClassroomId INT NOT NULL,
    FOREIGN KEY (TeacherId) REFERENCES Teachers(TeacherId),
    FOREIGN KEY (ClassroomId) REFERENCES Classroom(ClassroomId)
);
