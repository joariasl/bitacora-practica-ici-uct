<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
//require APPPATH . '/libraries/REST_Controller.php';
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
class Bitacora extends REST_oauth2 {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['user_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['user_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['user_delete']['limit'] = 50; // 50 requests per hour per user/key

        $this->gapi_user = $this->client->getUserFromToken( $this->getToken() );
    }

    public function index_get()
    {
        $this->db->select('bita_fecha, bita_actividades, bita_conclusiones');
        $this->db->from('bitacora');
        $this->db->where('gapi_uid', $this->gapi_user['sub']);

        $query = $this->db->get();

        $this->response($query->result());
    }

    public function contenido_get()
    {
        // Redirection of HTTP method for DELETE with action get option
        $action = $this->get('action');
        if($action == 'delete'){
          $this->contenido_delete();
          return; //Stop function
        }

        $fecha = $this->get('fecha');

        $this->db->select('bita_fecha, bita_actividades, bita_conclusiones');
        $this->db->from('bitacora');
        $this->db->where('gapi_uid', $this->gapi_user['sub']);
        $this->db->where('bita_fecha', $fecha);
        $this->db->limit(1);

        $query = $this->db->get();

        if($query->num_rows() > 0){
          $this->response($query->result()[0]);// With [0] becouse the element is_array, return a object response.
        }else{
          // Set the response and exit
          $this->response([
              'status' => FALSE,
              'message' => 'Not found'
          ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
        }
    }

    // CREATE
    public function contenido_post()
    {
        // UPDATE
        $data = array(
          'bita_actividades'  => $this->post('bita_actividades'),
          'bita_conclusiones' => $this->post('bita_conclusiones')
        );

        $this->db->where('gapi_uid', $this->gapi_user['sub']);
        $this->db->where('bita_fecha', $this->post('bita_fecha'));
        $this->db->update('bitacora', $data);

        if($this->db->affected_rows() <= 0){
          // INSERT
          $data = array(
            'gapi_uid'          => $this->gapi_user['sub'],
            'bita_fecha'        => $this->post('bita_fecha'),
            'bita_actividades'  => $this->post('bita_actividades'),
            'bita_conclusiones' => $this->post('bita_conclusiones')
          );

          $this->db->set($data);
          $this->db->insert('bitacora');
          if($this->db->affected_rows() > 0){
            $this->set_response(NULL, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
          }else{
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
          }
        }else{
          $this->set_response(NULL, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
        }
    }

    // UPDATE
    public function contenido_put()
    {
        $data = array(
          'bita_actividades'  => $this->post('bita_actividades'),
          'bita_conclusiones' => $this->post('bita_conclusiones')
        );

        $this->db->where('gapi_uid', $this->gapi_user['sub']);
        $this->db->where('bita_fecha', $fecha);
        $this->db->update('bitacora', $data);
        $this->set_response(NULL, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }

    // DELETE
    public function contenido_delete()
    {
        $fecha = $this->get('fecha');

        $this->db->where('gapi_uid', $this->gapi_user['sub']);
        $this->db->where('bita_fecha', $fecha);
        $this->db->delete('bitacora');

        if($this->db->affected_rows() > 0){
          $this->response(NULL, REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
        }else{
          $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }
    }

}
