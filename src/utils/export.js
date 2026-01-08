export const exportProjectJSON = (project) => {
  if (!project) return;
  const dataStr = JSON.stringify(project, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${project.name.replace(/\s+/g, "_")}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportProjectCSV = (project) => {
  if (!project) return;
  let csv = "Phase,Note,Timestamp\n";
  project.notes.forEach((notes, i) => {
    notes.forEach((note) => {
      csv += `"${i+1}","${note.text.replace(/"/g,'""')}","${note.timestamp}"\n`;
    });
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${project.name.replace(/\s+/g, "_")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
