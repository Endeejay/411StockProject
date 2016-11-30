switch (k) {
	case 1,2: j = 2*k - 1;
			  break;
	case 3,5: j = 3*k - 1;
			  break;
	case 4:   j = 4*k - 1;
			  break;
	case 6,7,8: j = k - 2;
		        break;
	default: 
		System.out.println("error!");
		break;
}