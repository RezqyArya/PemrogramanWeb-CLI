import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "tasks.json");

async function loadTasks() {
    try {
        const data = await readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function saveTasks(tasks) {
    await writeFile(filePath, JSON.stringify(tasks, null, 2));
}

export async function addTask(title) {
    const tasks = await loadTasks();
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        done: false
    };
    tasks.push(newTask);
    await saveTasks(tasks);
    return newTask;
}

export async function listTasks() {
    return await loadTasks();
}

export async function markDone(id) {
    const tasks = await loadTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return null;

    task.done = true;
    await saveTasks(tasks);
    return task;
}

export async function removeTask(id) {
    const tasks = await loadTasks();
    const newTasks = tasks.filter(t => t.id !== id);

    if (tasks.length === newTasks.length) return false;

    await saveTasks(newTasks);
    return true;
} 