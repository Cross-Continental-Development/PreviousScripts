<?php
// Include the mysqli library
$conn = new mysqli("102.222.124.17", "xcondea8o1p9_admin", "adminshare2teach", "xcondea8o1p9_SHARE2TEACH");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from database
$sql = "SELECT QUESTION, ANSWER FROM FAQ";
$result = mysqli_query($conn, $sql);

// Store data in PHP array
$data = array();
while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Output data in JSON format
header('Content-Type: application/json');
echo json_encode($data);

// Close database connection
mysqli_close($conn);
?>