# Retrieving bulk data from SRA in batch format

Retrieving data from SRA can be a tedious experience, requiring in many cases for you to download each file one by one. This can be especially frustrating when the project consists of hundreds of files/samples.

I've outlined steps and also included scripts to facilitate this process, allowing you to download any number of SRA files using a simple query.

## Outline of the steps to perform

Before beginning, if you do not have Entrez Direct (EDirect) installed, download and install from NCBI. This writeup assumes you've downloaded edirect to ~/bin/edirect -- this is for illustration purposes and not necessarily a recommendation.

You will first need to identify which projects/samples you'd like to download. Here, I will be using project "SRP056480" as an example.

### 1. First retrieve Project info:
```bash
# Download metadata based on the query and output in file
~/bin/edirect/esearch -db sra -query SRP056480 > esearch.SRP056480
```

### 2. Retrieve Run Info using the metadata from the Project
```bash
cat esearch.SRP056480 | ~/bin/edirect/efetch --format runinfo > runinfo.SRP056480
```

### 3. Generate a SRR list from the Run Info
```bash
cat runinfo.SRP056480 | cut -d ',' -f 1 | grep SRR > SRR_List.SRP056480
```

### 4. Build a list of FTP files
[Download my small python script](Retrieve_Raw_Data_From_SRA-Supporting/build_wget_list.py) that builds a list of urls
```bash
# This will generate a new file from the passed one and append .wget to the filename
python build_wget_list.py SRR_List.SRP056480
```

### 5. Download all FTP files
```bash
# This will download all files lised in the SRR_List file to the current directory
cat SRR_List.SRP056480.wget | xargs wget
```


## Streamlining

Steps 1-3 actually generate multiple files along the way. If you don't have any interest in storing those files, you can instead simply pipe through with something like this:
```bash
~/bin/edirect/esearch -db sra -query SRP056480 | ~/bin/edirect/efetch --format runinfo | cut -d ',' -f 1 | grep SRR > SRR_List.SRP056480
```
