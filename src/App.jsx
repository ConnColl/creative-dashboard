import { useState } from "react";
import DashboardCard from "./DashboardCard";

const CREATIVE_TYPES = [
  "Display Banner",
  "Social Asset",
  "Landing Page",
  "Email",
  "Video",
  "Custom",
];

const PRIORITIES = [
  { value: "Urgent", label: "Urgent (1–3 Days)" },
  { value: "Medium", label: "Medium (4–6 Days)" },
  { value: "Normal", label: "Normal (7–10 Days)" },
];

const STATUSES = ["Submitted", "In Progress", "Completed"];

const initialProjects = [
  { id: 1, name: "Nike Summer Campaign", creativeType: "Display Banner", priority: "Urgent", status: "In Progress" },
  { id: 2, name: "Coca-Cola Social Assets", creativeType: "Social Asset", priority: "Urgent", status: "Submitted" },
  { id: 3, name: "Spotify Banner Refresh", creativeType: "Display Banner", priority: "Normal", status: "Completed" },
];

const priorityBadge = {
  Urgent: "bg-red-100 text-red-700 border border-red-200",
  Medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Normal: "bg-green-100 text-green-700 border border-green-200",
};

const statusBadge = {
  Submitted: "bg-blue-100 text-blue-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
};

let nextId = initialProjects.length + 1;

function App() {
  const [projectList, setProjectList] = useState(initialProjects);
  const [newProjectName, setNewProjectName] = useState("");
  const [newCreativeType, setNewCreativeType] = useState(CREATIVE_TYPES[0]);
  const [newPriority, setNewPriority] = useState("Medium");
  const [customType, setCustomType] = useState("");
  const [formError, setFormError] = useState("");

  const submitted = projectList.filter((p) => p.status === "Submitted").length;
  const inProgress = projectList.filter((p) => p.status === "In Progress").length;
  const completed = projectList.filter((p) => p.status === "Completed").length;

  function addProject() {
    if (!newProjectName.trim()) {
      setFormError("Project name is required.");
      return;
    }
    const creativeType = newCreativeType === "Custom" ? customType.trim() || "Custom" : newCreativeType;
    setProjectList([
      ...projectList,
      { id: nextId++, name: newProjectName.trim(), creativeType, priority: newPriority, status: "Submitted" },
    ]);
    setNewProjectName("");
    setNewCreativeType(CREATIVE_TYPES[0]);
    setNewPriority("Medium");
    setCustomType("");
    setFormError("");
  }

  function updateStatus(id, status) {
    setProjectList(projectList.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Creative Operations Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Intake, prioritize, and track creative work requests</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-8 space-y-8">
        {/* Dashboard Cards */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            <DashboardCard title="Submitted" value={submitted} color="blue" />
            <DashboardCard title="In Progress" value={inProgress} color="yellow" />
            <DashboardCard title="Completed" value={completed} color="green" />
          </div>
        </section>

        {/* Create Request Form */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-5">New Request</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                placeholder="e.g. Nike Summer Campaign"
                value={newProjectName}
                onChange={(e) => { setNewProjectName(e.target.value); setFormError(""); }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formError && <p className="text-red-500 text-xs mt-1">{formError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Creative Type</label>
              <select
                value={newCreativeType}
                onChange={(e) => setNewCreativeType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CREATIVE_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              {newCreativeType === "Custom" && (
                <input
                  type="text"
                  placeholder="Describe creative type"
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority / SLA</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={addProject}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              Submit Request
            </button>
            <span className="text-xs text-gray-400">Requests are automatically set to <strong>Submitted</strong></span>
          </div>
        </section>

        {/* Project Table */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            All Requests ({projectList.length})
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Project</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Creative Type</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Priority</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projectList.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-400">No requests yet. Submit one above.</td>
                  </tr>
                )}
                {projectList.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{project.name}</td>
                    <td className="px-5 py-3 text-gray-600">{project.creativeType}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${priorityBadge[project.priority]}`}>
                        {project.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <select
                        value={project.status}
                        onChange={(e) => updateStatus(project.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusBadge[project.status]}`}
                      >
                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
