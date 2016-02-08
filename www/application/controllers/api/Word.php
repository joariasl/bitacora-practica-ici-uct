<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . 'libraries/REST_oauth2.php';

/**
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Word extends REST_oauth2 {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        $this->gapi_user = $this->client->getUserFromToken( $this->getToken() );
        setlocale(LC_ALL,"es_ES");
    }

    public function index_get()
    {
        // QUERY
        $this->db->select('bita_fecha, bita_actividades, bita_conclusiones');
        $this->db->from('bitacora');
        $this->db->where('gapi_uid', $this->gapi_user['sub']);
        $this->db->order_by('bita_fecha', 'ASC');

        $query = $this->db->get();


        $phpWord = new \PhpOffice\PhpWord\PhpWord();

        // New section
        $section = $phpWord->createSection(array(
            'pageSizeW'=> 12240,
            'pageSizeH'=> 15840));

        // Header
        $header = $section->createHeader();
        //$header->addTextBreak();
        $header->addImage('logo-uct.jpg', array('width'=>150, 'height'=>52, 'align'=>'right'));
        $header->addText('Escuela de Ingeniería Informática', null, array('align'=>'left'));

        // Footer
        $footer = $section->createFooter();
        $footer->addPreserveText('Pág. {PAGE}', null, array('align'=>'right'));
        $footer->addTextBreak();

        $textrun = $footer->addTextRun(array('align'=>'center'));
        $textrun->addText('Rudecindo Ortega 02950');
        $textrun->addText(' · ', array('size' => 12, 'bold'=>true));
        $textrun->addText('Fono 56 45 2205414');
        $textrun->addText(' · ', array('size' => 12, 'bold'=>true));
        $textrun->addText('Casilla 15D');
        $textrun->addText(' · ', array('size' => 12, 'bold'=>true));
        $textrun->addText('Temuco - Chile');
        $textrun->addText(' · ', array('size' => 12, 'bold'=>true));
        $textrun->addText('www.uctemuco.cl');

        $phpWord->addTitleStyle(1, array('size' => 18, 'bold' => true));
        $cellStyleTableBitacoraFecha = array('bold' => true, 'bgColor' => 'EEEEEE');
        $cellStyleTableBitacoraTitle = array('bold' => true, 'bgColor' => 'CCCCCC');

        $section->addTitle('Bitácora', 1);
        $section->addText(htmlspecialchars($this->gapi_user['name']));
        $section->addTextBreak();

        foreach ($query->result() as $row)
        {
          $phpWord->addTableStyle(htmlspecialchars('tableBitacora'), array('borderSize' => 1, 'borderColor' => '000000'));
          $table = $section->addTable('tableBitacora');

          $table->addRow();
          $table->addCell(9600, $cellStyleTableBitacoraFecha)->addText(htmlspecialchars('Fecha: ' . strftime("%A",strtotime($row->bita_fecha)) . ' ' . date( 'd/m/Y', strtotime($row->bita_fecha) ) ), array('size' => 12, 'bold' => true));
          $table->addRow();
          $table->addCell(9600, $cellStyleTableBitacoraTitle)->addText(htmlspecialchars('Actividades planificadas'), array('size' => 11));
          $table->addRow();
          $table->addCell(9600, null)->addText(htmlspecialchars($row->bita_actividades));
          $table->addRow();
          $table->addCell(9600, $cellStyleTableBitacoraTitle)->addText(htmlspecialchars('Conclusiones (al término del día)'), array('size' => 11));
          $table->addRow();
          $table->addCell(9600, null)->addText(htmlspecialchars($row->bita_conclusiones));

          $section->addTextBreak();
        }


        /******** SALIDA DE ARCHIVO ********/

        // Redirect output to a client’s web browser (Excel5)
        header('Content-Type: application/vnd.ms-word');
        header('Content-Disposition: attachment;filename="Bitacora.docx"');
        header('Cache-Control: max-age=0');
        // If you're serving to IE 9, then the following may be needed
        header('Cache-Control: max-age=1');

        // If you're serving to IE over SSL, then the following may be needed
        header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
        header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
        header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
        header ('Pragma: public'); // HTTP/1.0

        // Save File
        $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
        $objWriter->save('php://output');

    }

}
