import React from "react";
import useSWR from "swr";

interface ReceiveResult {
  case_id: string;
}

interface StatusResult {
  size: number;
  case_id: string;
}

function App() {
  const [caseId, setCaseId] = React.useState<string | null>(null);
  const caseStatusSWR = useSWR<StatusResult | null>(
    caseId ? `/api/case/${caseId}` : null,
    (url: string | null) =>
      url
        ? fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(r)))
        : null,
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setCaseId(null);
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/receive-file", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      const data: ReceiveResult = await response.json();
      setCaseId(data.case_id);
      form.reset();
    } catch (error) {
      alert(String(error));
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" required />
        <button type="submit">Submit</button>
      </form>
      <div>{JSON.stringify(caseStatusSWR.data)}</div>
    </div>
  );
}

export default App;
