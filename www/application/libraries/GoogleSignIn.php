<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH.'third_party/google-api-php-client/autoload.php';

class GoogleSignIn extends Google_Client {

  function __construct(){
    parent::__construct();
  }

  public function getUserFromToken($token) {
    try {
      $ticket = $this->verifyIdToken($token);
    } catch (Google_Auth_Exception $e){
      return false;
    }
    if ($ticket) {
      $data = $ticket->getAttributes();
      return $data['payload']; // user ID
    }
    return false;
  }
}
