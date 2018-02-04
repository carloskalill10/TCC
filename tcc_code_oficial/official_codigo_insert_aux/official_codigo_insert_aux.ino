#include <ESP8266WiFi.h> // biblioteca para usar as funções de Wifi do módulo ESP8266
#include <ESP8266HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>  // biblioteca JSON para sistemas embarcados

#define RST_PIN 2 // RST-PIN MFRC522 - RFID - SPI - Modulo GPIO02
#define SS_PIN  4  // SDA-PIN MFRC522 - RFID - SPI - Modulo GPIO4

MFRC522 mfrc522(SS_PIN, RST_PIN); // Cria acesso MFRC522

String tag; // codigo lido do rfid

// Definições da rede Wifi
const char* login = "PISO 2";
const char* senha = "a82dis@!";

// endereço IP local do Servidor Web instalado na Raspberry Pi 3
// onde será exibida a página web
const char* Host = "192.168.0.28";   

WiFiClient client;


//----------------------------------------------------------------------
// construindo o objeto JSON que irá armazenar os dados na função populateJSON()
StaticJsonBuffer<300> jsonBuffer;
JsonObject& object = jsonBuffer.createObject();

JsonObject& dado = object.createNestedObject("insert_aux");



//-------------------------------------------------------------------------
/*
 * função que conecta o NodeMCU na rede Wifi
 * SSID e PASSWORD devem ser indicados nas variáveis
 */
void reconnectWiFi() 
{
  if(WiFi.status() == WL_CONNECTED)
    return;

  WiFi.begin(login, senha);

  while(WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Conectado com sucesso na rede: ");
  Serial.println(login);
  Serial.print("IP obtido: ");
  Serial.println(WiFi.localIP());  
}

void initWiFi()
{
  delay(10);
  Serial.print("Conectando-se na rede: ");
  Serial.println(login);
  Serial.println("Aguarde");
  reconnectWiFi();
}
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
/*
 * função que armazena cada dado do sensor em um objeto JSON
 * utiliza a biblioteca ArduinoJson
 */
void montaJSON(){
  dado["id_usuario"] = tag;  
}


/*
 * função que envia os dados do sensor para o servidor em formato JSON
 * faz um POST request ao servidor 
 */
String metodoPOST()
{
  if(!client.connect(Host,3000) )     // aqui conectamos ao servidor
  {
    Serial.print("Nao foi possivel conectar ao servidor!\n");
  }else{    
    Serial.println("Conectado ao servidor");
    // Faz o HTTP POST request    
    client.println("POST /api/acessos HTTP/1.1");
    client.println("Host: 192.168.0.28");
    client.println("Content-Type: application/json");
    client.print("Content-Length: ");
    client.println(object.measureLength());
    client.println();
    object.printTo(client);    // envio do JSON
    while (client.connected()) {
     String resposta = client.readStringUntil('\r');
      if (resposta == "\n") {
        break;
      }
    }
    
    String resposta = client.readStringUntil('\r');
    String resp=resposta.substring(1);
    Serial.println(resp);
    return resp; 
  }
}


//--------------------------------------------------------------------------------------

void setup() {
  
 Serial.begin(115200);
  pinMode(D1, OUTPUT);
  delay(250);
  Serial.println();
  Serial.println("Iniciando....");

  SPI.begin();           // Inicia a serial SPI para o leitor
  mfrc522.PCD_Init();    // Inicia o leitor RFID
   
  initWiFi();
}


void loop() {
  String compara="{\"ok\":\"ok\"}";
  
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()){ // Verifica se o cartao foi lido e ler
    Serial.printf("Tag:");
    
    for (byte i = 0; i < mfrc522.uid.size; i++) {
       Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
       Serial.print(mfrc522.uid.uidByte[i], HEX);
       tag.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
       tag.concat(String(mfrc522.uid.uidByte[i], HEX));
    }
    Serial.println();
    if(WiFi.status() == WL_CONNECTED) { // Verifica a conexao Wifi
        montaJSON();  // transforma os dados em formato JSON
        
        if (metodoPOST().equals(compara)){      // envia os dados ao servidor   
            Serial.println("enviou!!!!!!!!!");
            digitalWrite(D1, HIGH); 
            delay(1000);  
        }else{
            Serial.println("nao enviou, servidor nao disponivel!!!!!!!!!");
        }
        
    }else{
            Serial.printf("não conectado a wifi...");
             
    }
      delay (1000);
  }
}


       
           


