import {
    addTask,
    listTasks,
    markDone,
    removeTask
} from "./tasks.js";

const args = process.argv.slice(2);
const command = args[0];

async function main() {
    switch (command) {

        case "add": {
            const title = args.slice(1).join(" ");
            if (!title) return console.log("Harap masukkan nama tugas.");

            const task = await addTask(title);
            console.log(`\x1b[32m[+] Tugas ditambahkan:\x1b[0m "${task.title}" (ID: ${task.id})`);
            break;
        }

        case "list": {
            const tasks = await listTasks();

            console.log("--- DAFTAR TUGAS ---");

            tasks.forEach(t => {
                const status = t.done ? "✓" : "○";
                const selesai = t.done ? " (Selesai)" : "";
                console.log(`[${t.id}] ${status} ${t.title}${selesai}`);
            });

            console.log("---------------------");
            break;
        }

        case "done": {
            const id = Number(args[1]);
            if (!id) return console.log("Masukkan ID tugas.");

            const result = await markDone(id);
            if (!result) return console.log("ID tidak ditemukan.");

            console.log(`\x1b[32m[✓] Tugas ditandai selesai:\x1b[0m "${result.title}"`);
            break;
        }

        case "remove": {
            const id = Number(args[1]);
            if (!id) return console.log("Masukkan ID tugas.");

            const ok = await removeTask(id);
            if (!ok) return console.log("ID tidak ditemukan.");

            console.log(`\x1b[31m[-] Tugas dengan ID ${id} telah dihapus.\x1b[0m`);
            break;
        }

        default:
            console.log("Perintah tidak dikenal. Gunakan:");
            console.log(" add \"Nama Tugas\"");
            console.log(" list");
            console.log(" done <id>");
            console.log(" remove <id>");
    }
}

main(); 