---
title: OpenStack Installation in Ubuntu using MicroStack
date: 2024-03-18
description: Build your own private cloud with OpenStack using a simplified MicroStack installation on Ubuntu.
tags:
  - Cloud Computing
  - OpenStack
  - MicroStack
  - Ubuntu
  - Virtualization
---

![OpenStack on Ubuntu](/assets/images/dynamic/openstack/OpenStack-ubuntu-logo.png)

In this article, we will discuss how to set up a single-node OpenStack cloud environment on Ubuntu using **MicroStack**. 

---

## What is OpenStack?

OpenStack is a powerful, open-source cloud computing platform that allows you to build and manage public and private clouds. It provides a comprehensive set of services for managing compute (Nova), storage (Swift/Cinder), and networking (Neutron) resources, making it easy to deploy and scale applications at cloud scale.

---

## What is MicroStack?

**MicroStack** is a lightweight, single-node packaging of OpenStack developed by Canonical. It packages the core OpenStack services into a single `snap` package, making it perfect for local development, testing, and learning. It allows you to run a simplified OpenStack cluster on your local machine without the complexity of a multi-node production deployment.

By using MicroStack on Ubuntu, you can gain hands-on experience spinning up virtual machines, configuring networks, and managing storage volumes directly from your local workstation.

---

## Requirements

Before beginning the installation, ensure your machine meets the following minimum specifications:
- **OS:** Ubuntu 18.04 LTS or later
- **RAM:** Minimum 4GB (8GB+ recommended)
- **Disk Space:** 20GB of free space
- **Python:** Python 3.6 or later
- **Package Manager:** `snapd` installed and configured

---

## Installation Steps

Installing OpenStack using MicroStack is a streamlined process. Follow these steps to get your local cloud environment running:

### Step 1: Install Snapd (If Not Installed)

If you do not have `snapd` installed on your system, update your package list and install it:

```bash
sudo apt update
sudo apt install snapd
```

For more detailed setup instructions, refer to the [Snapd installation guide](https://snapcraft.io/docs/installing-snapd).

### Step 2: Install MicroStack

Install the MicroStack snap package from the beta channel:

```bash
sudo snap install microstack --beta
```

### Step 3: Verify the Installation

Verify that the MicroStack package and command-line tools are installed correctly by checking the version:

```bash
microstack.openstack --version
```

It should return output matching the version details below:

![OpenStack version](/assets/images/dynamic/openstack/openstack-version.png)

### Step 4: Initialize MicroStack

Initialize the single-node OpenStack environment. This command automatically configures network bridges, default databases, and default flavors:

```bash
sudo microstack init --auto --control
```

Upon successful completion, you will see initialization details in your terminal:

![OpenStack initialized](/assets/images/dynamic/openstack/openstack-image-installed.png)

### Step 5: List Available Images and Flavors

To verify that the default cloud images and system flavors (resource configurations) were created:

```bash
microstack.openstack image list && microstack.openstack flavor list
```

The output list should display the default CirrOS image and standard machine flavors:

![OpenStack images and flavors](/assets/images/dynamic/openstack/openstack-img-flavor.png)

### Step 6: Retrieve Credentials

To access the Horizon dashboard web interface, you need to retrieve the auto-generated password for the admin account. Run the following command:

```bash
sudo snap get microstack config.credentials.keystone-password
```

The terminal will return the keystore admin password:

![OpenStack password](/assets/images/dynamic/openstack/openstack-password.png)

### Step 7: Locate Your IP Address

Retrieve your system's network IP address to connect to the dashboard:

```bash
ip addr
```

Look for your primary network interface IP details:

![IP address configuration](/assets/images/dynamic/openstack/ip-addr.png)

### Step 8: Log In to the Horizon Dashboard

Open your web browser and navigate to either:
```
http://<your-ip-address>/auth/login/
```
or
```
http://localhost/auth/login/
```

You should see the OpenStack Horizon login portal:

![OpenStack login page](/assets/images/dynamic/openstack/openstack-login.png)

Log in using the following credentials:
- **Username:** `admin`
- **Password:** *[The password retrieved in Step 6]*

Once logged in, you will be redirected to the OpenStack Dashboard where you can manage your instances and networks:

![OpenStack dashboard](/assets/images/dynamic/openstack/openstack-page.png)

---

## Quick Reference Commands

Here is the TL;DR version of the installation commands:

```bash
# Install and initialize
sudo snap install microstack --beta
sudo microstack init --auto --control

# Get password
sudo snap get microstack config.credentials.keystone-password
```

### Managing the MicroStack Service

To save memory and CPU resources when you are not actively using OpenStack, disable the snap services:

```bash
sudo snap disable microstack
```

To resume using your local cloud, enable them again:

```bash
sudo snap enable microstack
```

---

*This post is periodically updated. If you run into any issues or find any mistakes, feel free to reach out to me at gopalkumargupta337@gmail.com.*
