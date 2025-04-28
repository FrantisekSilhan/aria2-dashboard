# aria2c Dashboard

Web dashboard for [aria2c](https://aria2.github.io/), built with Next.js, React, and Tailwind CSS.

---

## 🚀 Features

- **Multiple RPC endpoints**: Add, remove, and switch between them
- **Add downloads**: Specify URL and output directory
- **Control downloads**: Pause, resume, remove
- **Set global download speed**
- **Live stats**: Download/upload speed, active/waiting/stopped counts
- **Modern UI**: Responsive, clean, and fast

---

## 🖥️ Dashboard Setup

1. **Clone the repository:**

```bash
git clone https://github.com/frantiseksilhan/aria2-dashboard.git
cd aria2-dashboard
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the project:**

```bash
npm run dev
```

4. **Open your browser:**

Visit http://localhost:3000/dashboard

---

## ⚙️ aria2c Configuration

1. **Create aria2c config file**

Edit `/home/USER/.aria2/aria2.conf` (replace USER with your username):

```ini
enable-rpc=true
rpc-listen-all=true
dir=/home/USER/aria2
continue=true
rpc-allow-origin-all=true
```

- enable-rpc=true: Enables the JSON-RPC interface
- rpc-listen-all=true: Listens on all network interfaces (for remote access)
- dir=/home/USER/aria2: Default download directory
- continue=true: Resume partially downloaded files
- rpc-allow-origin-all=true: Allow all origins (for dashboard access)

- Replace `USER` with your actual username.

> Tip: Create the download directory if it doesn't exist:
> ```bash
> mkdir -p /home/USER/aria2
> ```

2. **Create a systemd service**

Create `/etc/systemd/system/aria2c.service`:

```ini
[Unit]
Description=Aria2c download manager
After=network.target

[Service]
User=USER
ExecStart=/usr/bin/aria2c --conf-path=/home/USER/.aria2/aria2.conf
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

- Replace `USER` with your actual username.

3. **Enable and start the service**

```bash
sudo systemctl daemon-reload
sudo systemctl enable aria2c
sudo systemctl start aria2c
```

Check status with:

```bash
sudo systemctl status aria2c
```

---

## 🔒 Security Notes

- For public or remote access, consider securing your aria2c RPC interface with a secret token or firewall rules.
- See the [aria2c documentation](https://aria2.github.io/manual/en/html/aria2c.html) for more info.

---

## 📝 License

**MIT**