<?php
header('Content-Type: text/html; charset=utf-8');
ob_start();

include("config.php"); 
include("googlesheets.php"); 

//Seleccionamos el ultimo
$match = "SELECT * FROM tbAdherentes order by adhID desc LIMIT 1;";
$qry = mysqli_query($link,$match)
or die ("No se pudieron encontrar datos porque ".mysqli_error($link)); 
$info = mysqli_fetch_array( $qry );

$id = 0;
if($info != null)
    $id = $info['adhID'] + 1;

$data = array(
    "nombre"  => utf8_decode(str_replace("'","&#39;",$_GET['name'])),
    "email" => utf8_decode(str_replace("'","&#39;",$_GET['email'])),
    "pais" => $_GET['pais'],
    "tipo" => $_GET['tipo'],
    "fecha" => date("Y-m-d H:i:s")
);

echo $id . " | " . implode("|",$data);

//Agregamos el nuevo
$match = "insert into tbAdherentes values (".
    ($id).", ".
    $data['tipo'].", '".
    $data['nombre']."', '".
    $data['email']."', '".
    $data['pais']."', '".
    date("Y-m-d H:i:s")."');";

$qry = mysqli_query($link,$match)
or die ("No se pudo insertar porque ".mysqli_error($link));

EscribirFilaGoogleSheets($data);

echo 'ok';

ob_end_flush();
?>