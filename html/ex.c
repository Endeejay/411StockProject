boolean search = false;

for (i = 1; i <= n; i++) {
	int p = 0;
	for (j = 1; j <= n; j++) {
		if(x[i][j] == 0) {
			p++;
		}
	}
	if (p == n && search == false) { 
		printf("first all zero row is: %d", i);
		search = true;
	}
}