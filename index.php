<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Loading...</title>

		<link  rel="stylesheet" type="text/css" href="style.css" />
	</head>
	<body>
		<div id="app"></div>
		
		<script>
			var code = "<?php if(isset($_GET['code'])){echo $_GET['code'];} ?>";
		</script>
		<script src="public/js/bundle.js"></script>
	</body>
</html>