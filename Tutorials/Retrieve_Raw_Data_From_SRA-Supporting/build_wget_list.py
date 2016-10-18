import sys

if len(sys.argv) < 2:
  print "pass filename to process"
  exit()

flist = open(sys.argv[1], 'r')
flist_out = open(sys.argv[1] + ".wget", 'w')
for line in flist:
  line = line.strip()
  flist_out.write( "ftp://ftp-trace.ncbi.nih.gov/sra/sra-instant/reads/ByRun/sra/SRR/" + line[:6] + "/" + line + "/" + line + ".sra \n" )
flist.close()
flist_out.close()