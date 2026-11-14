"""Check public case outputs and derive throughput and energy from the run receipt."""
from pathlib import Path
import json
from collections import Counter

root = Path(__file__).resolve().parent
cases = [json.loads(line) for line in (root / "cases.jsonl").read_text().splitlines()]
run = json.loads((root / "cpu-package.json").read_text())
counts = Counter(row["skill"] for row in cases)
assert len(counts) == 5 and set(counts.values()) == {200}
assert len({(r["skill"], json.dumps(r["input"], sort_keys=True)) for r in cases}) == 1000
for i, row in enumerate(cases, 1):
    assert json.dumps(row["expected"]) == json.dumps(row["actual"]), f"Mismatch in case {i}"
assert len(cases) * run["sets"] == run["correct"]
print(f'{len(cases):,} distinct cases matched across {len(counts)} skills.')
print(f'{run["correct"] / run["seconds"]:,.0f} correct answers per second in the recorded run.')
print(f'{run["Wh"] * 3600 / run["seconds"]:.2f} W average CPU package power.')
