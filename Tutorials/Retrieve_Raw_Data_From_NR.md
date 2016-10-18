# Retrieving bulk data from NCBI nr, etc

Downloading sequence data from nr can be automated in a number of ways. I've found the following method to be the simplest. 

## Outline of the steps to perform

Before beginning, if you do not have Entrez Direct (EDirect) installed, download and install from NCBI. This writeup assumes you've downloaded edirect to ~/bin/edirect -- this is for illustration purposes and not necessarily a recommendation.

### 1. Identify the query that you'd like to use

Here, I'm going to use the query "prevotella AND copri" to search for any sequences with both those terms in the sequence description. It may be a good idea to first run the query through the [web interface](https://www.ncbi.nlm.nih.gov/nuccore/?term=prevotella+AND+copri) to ensure that your query is pulling the sequences that you're interested in, and also to formulate more complex queries if needed using the "Advanced Search" option. 

Also, note the number of records that the query returns so that you can confirm that our automated process is consistent with your expectation. In this example, the query "prevotella AND copri" returns 2759 records (10/11/16).

### 2. Sanity test before downloading data
*This step is optional but likely worth the trouble if you're downloading a large collection of sequences.*

Run __esearch__ using the following parameters, replacing the example query with your own:
```bash
~/bin/edirect/esearch -db nucleotide -query "prevotella AND copri"
```

This will return in standard output an XML representation of the query results. You can save this to a file for your records, or just look it over to ensure that it is consistent with expectations. Here is the output that resulted from the above query:
```xml
<ENTREZ_DIRECT>
  <Db>nucleotide</Db>
  <WebEnv>NCID_1_2415224_130.14.22.215_9001_1476194366_1808129638_0MetA0_S_MegaStore_F_1</WebEnv>
  <QueryKey>1</QueryKey>
  <Count>2759</Count>
  <Step>1</Step>
</ENTREZ_DIRECT>
```

Note that __Count__ is 2759 - consistent with the query results I obtained in step 1.

If you encounter errors, it may be because you are missing Perl dependencies. To avoid this, install miniconda if you haven't done so already and run these library installation commands:

```bash
# Download miniconda
wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh

# Run installer
sh Miniconda3-latest-Linux-x86_64.sh

# Remove Miniconda installer
rm Miniconda3-latest-Linux-x86_64.sh

# Source new paths
source ~/.bashrc

# Install Perl and dependencies:
conda install -c bioconda perl=5.22.0
conda install -c bioconda perl-app-cpanminus=1.7039
conda install -c bioconda perl-html-parser
conda install -c bioconda perl-lwp-simple
conda install -c bioconda perl-lwp-protocol-https
```

### 3. Download the sequence data

In order to download sequence data for your specific use case, you'll need to redefine both the query and where to save the output. Here is the statement that I would run to download all 2759 records in my example:
```bash
~/bin/edirect/esearch -db nucleotide -query "prevotella AND copri" | ~/bin/edirect/efetch -format gb > PCopri_10-11-16.gb
```
Its recommended to run this as a submitted job if you are fetching a large number of sequences. 

If you're downloading many sequences, it may be useful to run a quick sanity check to ensure that you've downloaded all sequences and that the process wasn't interrupted. Here, because Genbank records are separated by "//", I can quickly test the result with the following statement:
```bash
grep '//$' PCopri_10-11-16.gb | wc -l  # Returns 2759
```
