<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Loading...</title>

		<link  rel="stylesheet" type="text/css" href="style.css" />
		<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
	</head>
	<body>
		<div id="app"></div>
		
		<script>
			var code = "<?php if(isset($_GET['code'])){echo $_GET['code'];} ?>";
		</script>
		
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeju7OrGMdNUZc9MTQLsg5Mj0i6Ac0C-g">
    	</script>
		<script src="public/js/bundle.js"></script>
	</body>
</html>