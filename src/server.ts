import app from "./app";
import { jobQueue } from "./queues/job.queue";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

(async () => {
  await jobQueue.add("test-job", { message: "hello bullmq" });
  console.log("Test job added");
})();
