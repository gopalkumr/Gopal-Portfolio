---
title: Install Hadoop using Docker on Ubuntu/Debian
date: 2024-03-24
description: Install Apache Hadoop using Docker on Ubuntu Linux and run your first MapReduce word count job.
tags:
  - Cloud Computing
  - Hadoop
  - MapReduce
  - Ubuntu
  - Docker
---

![Hadoop on Docker](/assets/images/dynamic/hadoop/Hadoop-using-docker.png)

In this article, we will discuss how to install Apache Hadoop using Docker on Ubuntu/Debian Linux and run a simple MapReduce job. 

While there are traditional ways to install Hadoop, they often require extensive configuration and setup of local Java environments, SSH keys, and system XML configuration files. Using Docker simplifies the installation, enabling you to run a single-node Hadoop cluster in minutes.

---

## Requirements

Before starting, ensure your system meets the following recommendations:
- **OS:** Ubuntu 18.04 LTS or later (or any Debian-based Unix distribution)
- **Engine:** Docker and Docker Compose installed
- **RAM:** Minimum 4GB (8GB+ recommended)
- **Disk Space:** 20GB of free space

---

## Step 1: Install Docker on Ubuntu

To get started, you must have Docker running on your machine. If you do not have Docker installed, you can set it up by copying and running the following commands in your terminal:

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

Install the Docker Engine and its related plugins:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo apt install docker-compose
```

Once the installation is complete, verify that the Docker daemon is active and running.

---

## Step 2: Install Hadoop using Docker

Clone the GitHub repository containing the pre-configured Hadoop Docker Compose files:

```bash
git clone https://github.com/gopalkumr/Hadoop-on-Docker
```

Navigate to the cloned repository and spin up the Hadoop container services (NameNode, DataNode, ResourceManager, and NodeManager) in detached mode:

```bash
cd Hadoop-on-Docker
sudo docker-compose up -d
```

Verify that all containers are active:

```bash
docker container ls
```

---

## Step 3: Copy Files and Access the Container

Copy the sample code files from the cloned repository directly into the running NameNode container:

```bash
sudo docker cp code namenode:/
```

Next, open an interactive bash session inside the NameNode container:

```bash
sudo docker exec -it namenode /bin/bash
```

---

## Step 4: Configure HDFS Directories

Within the NameNode container shell, create the target input directories in the Hadoop Distributed File System (HDFS) and initialize a new text file:

```bash
hdfs dfs -mkdir -p /user/root/input/
hdfs dfs -touchz /user/root/input/data.txt
```

Append sample text to your newly created `data.txt` file:

```bash
echo "The Apache Hadoop software library is a framework that allows for the distributed processing of large data sets across clusters of computers using simple programming models. It is designed to scale up from single servers to thousands of machines, each offering local computation and storage. Rather than rely on hardware to deliver high-availability, the library itself is designed to detect and handle failures at the application layer, so delivering a highly-available service on top of a cluster of computers, each of which may be prone to failures." | hdfs dfs -appendToFile - /user/root/input/data.txt
```

Verify that the content was successfully appended:

```bash
hadoop fs -cat /user/root/input/data.txt
```

---

## Step 5: Run the MapReduce Word Count Job

Navigate to the directory containing the compiled MapReduce Java executables:

```bash
cd /code/Hadoop_Code
```

Verify that `wordCount.jar` exists in this folder. Once confirmed, run the MapReduce job using the following command:

```bash
hadoop jar wordCount.jar org.apache.hadoop.examples.WordCount input output
```

---

## Step 6: Displaying the Output

After the MapReduce execution finishes successfully, you can view the computed word count results by reading the output files generated in HDFS:

```bash
hdfs dfs -cat /user/root/output/*
```

The output in your console should look like this:

![Hadoop MapReduce Output](/assets/images/dynamic/hadoop/hadoop-output.png)

---

*This post is periodically updated. If you run into any issues or have questions, feel free to contact me at gopalkumargupta337@gmail.com.*
