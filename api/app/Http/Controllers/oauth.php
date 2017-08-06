<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\users;
use App\history;

class oauth extends Controller
{
    public function getToken(){
        $code = $_GET['code'];

        $ch = curl_init();

        $data = array(
            'client_secret' => 'UIYQ-FEAx6s9Y1s1FoafNEExtHqBBlTQQmCBt62m',
            'grant_type' => 'authorization_code',
            'client_id' => '5WDLyRTEdGGpWtCSMRCioc7nawWC6YbO',
            'redirect_uri' => 'http://localhost/uberhist/',
            'code' => $code
        );

        curl_setopt($ch, CURLOPT_URL, "https://login.uber.com/oauth/v2/token");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

        curl_exec($ch);

        curl_close($ch);
    }

    public function getUser(){
        $token = $_GET['token'];

        $ch = curl_init();

        $data = array(
            'Authorization: Bearer '.$token,
            'Accept-Language: en_US',
            'Content-Type: application/json'
        );

        curl_setopt($ch, CURLOPT_URL, "https://api.uber.com/v1.2/me");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($ch);
        $userArr = json_decode($result, true);

        curl_close($ch);

        //Check for existing user
        $existing = users::where('email', $userArr['email'])->first();

        if($existing){
            //If exists, return user
            echo json_encode($existing);
        } else {
            //Else, create new user and return entry
            $newEntry = new users;

            $newEntry->first_name = $userArr['first_name'];
            $newEntry->last_name = $userArr['last_name'];

            $newEntry->email = $userArr['email'];
            
            $newEntry->uuid = $userArr['uuid'];
            $newEntry->rider_id = $userArr['rider_id'];

            $newEntry->save();

            echo json_encode($newEntry);
        }
    }

    public function getHistory(){
        $token = $_GET['token'];
        $uuid = $_GET['uuid'];
        $default = json_decode($_GET['default']);

        if($default == false){
            $ch = curl_init();
            $data = array(
                'Authorization: Bearer '.$token,
                'Accept-Language: en_US',
                'Content-Type: application/json'
            );

            curl_setopt($ch, CURLOPT_URL, "https://api.uber.com/v1.2/history?limit=50");   
            curl_setopt($ch, CURLOPT_HTTPHEADER, $data);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

            $history = json_decode(curl_exec($ch));

            curl_close($ch);
        } else {
            $history = json_decode(file_get_contents(public_path().'/default.json'));
        }

        //Add to history db with uuid as identifier
        foreach($history->history as $entry){
            //if request id not exists, create
            $exist = history::where('request_id', $entry->request_id)->first();

            if(!$exist){
                $newEntry = new history;

                $newEntry->uuid = $uuid;
                $newEntry->request_id = $entry->request_id;
                $newEntry->distance = $entry->distance;
                $newEntry->display_name = $entry->start_city->display_name;
                $newEntry->longitude = $entry->start_city->longitude;
                $newEntry->latitude = $entry->start_city->latitude;

                $newEntry->save();
            }
        }

        //get DB using UUID and return as JSON array
        $show = history::where('uuid', $uuid)->get();

        echo json_encode($show);
    }
}
