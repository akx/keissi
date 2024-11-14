import os
import pathlib
import uuid

import fastapi
import pydantic
from fastapi.staticfiles import StaticFiles

app = fastapi.FastAPI()

case_path = pathlib.Path(os.getcwd()) / "cases"

static_path = pathlib.Path(__file__).parent / "static"
index_path = static_path / "index.html"
app.mount("/assets", StaticFiles(directory=static_path / "assets"))


class ReceiveResult(pydantic.BaseModel):
    case_id: uuid.UUID


class StatusResult(pydantic.BaseModel):
    size: int
    case_id: uuid.UUID


@app.post("/api/receive-file")
def receive_file(file: bytes = fastapi.File(...)) -> ReceiveResult:
    case_id = uuid.uuid4()
    case_file = case_path / f"{case_id}.dat"
    case_file.parent.mkdir(parents=True, exist_ok=True)
    case_file.write_bytes(file)
    return ReceiveResult(case_id=case_id)


@app.get("/api/case/{case_id}")
def get_case(case_id: uuid.UUID) -> StatusResult:
    case_file = case_path / f"{case_id}.dat"
    if case_file.exists():
        return StatusResult(case_id=case_id, size=case_file.stat().st_size)
    raise fastapi.HTTPException(status_code=404, detail="Case not found")


@app.get("/{full_path:path}")
def get_index():
    return fastapi.responses.FileResponse(index_path)
