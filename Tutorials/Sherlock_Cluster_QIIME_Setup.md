# QIIME Setup on Sherlock Cluster

## Installation

```bash
# Download miniconda
wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh

# Run installer
sh Miniconda3-latest-Linux-x86_64.sh

# Remove Miniconda installer
rm Miniconda3-latest-Linux-x86_64.sh 

# Source new paths
source ~/.bashrc

# Install QIIME 1
conda create -n qiime1 python=2.7 qiime matplotlib=1.4.3 mock nose -c bioconda

# Confirm installation
source activate qiime1
print_qiime_config.py -t
```

## Running QIIME

In order to use QIIME in the future, you’ll always need to run the following in order to setup the environment before running any scripts:
```bash
source activate qiime1
```