#include <ESP8266WiFi.h> // biblioteca para usar as funções de Wifi do módulo ESP8266
#include <ESP8266HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>  // biblioteca JSON para sistemas embarcados

#define RST_PIN 2 // RST-PIN MFRC522 - RFID - SPI - Modulo GPIO02
#define SS_PIN  4  // SDA-PIN MFRC522 - RFID - SPI - Modulo GPIO4

MFRC522 mfrc522(SS_PIN, RST_PIN); // Cria acesso MFRC522

//-----------------------------------------------------------------

char code_RFID[20] = ""; // codigo lido do rfid

// Definições da rede Wifi
const char* login = "K1";
const char* senha = "12345678";

// endereço IP local do Servidor Web instalado na Raspberry Pi 3
// onde será exibida a página web
const char* Host = "192.168.43.196";   

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
  object["nodeID"] = "Bikenorte";

  dado["id_usuario"] = code_RFID;  
}


/*
 * função que envia os dados do sensor para o servidor em formato JSON
 * faz um POST request ao servidor 
 */
int metodoPOSTinc()
{
  if(!client.connect(Host,3000) )     // aqui conectamos ao servidor
  {
    Serial.print("Nao foi possivel conectar ao servidor!\n");
    return 0;
  }else{    
    Serial.println("Conectado ao servidor");
    // Make HTTP POST request    
    client.println("POST /api/insert_aux HTTP/1.1");
    client.println("Host: 192.168.0.12");
    client.println("Content-Type: application/json");
    client.print("Content-Length: ");
    client.println(object.measureLength());
    client.println();
    object.printTo(client);    // envio do JSON
    return 1;    
  }
}



//--------------------------------------------------------------------------------------
//funções do rfid

char *read_RFID(char *buffer){ // Funcao para ler as tags
    // Verifica se ha tags presentes e ler
    if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
       buffer = dump_byte_array(mfrc522.uid.uidByte, mfrc522.uid.size, buffer);
       // Mostra o codigo da tag em hexadecimal
       
       Serial.printf("Tag: %s\n", buffer);
       return buffer;
    } else{
       return NULL;
    }
}



// Funcao para converter codigo RFID para char [] em hexadecimal
char * dump_byte_array(byte *buffer, byte bufferSize, char * result) {
    for (byte i = 0; i < bufferSize; i++) {
      char num[3];
      itoa(buffer[i], num, 16);
      if (buffer[i] <= 0xF) strcat(result, "0");
      strcat(result, num);
    }
    return result;
}


//--------------------------------------------------------------------------------------

void setup() {
  
 Serial.begin(115200);
  delay(250);
  Serial.println();
  Serial.println("Iniciando....");

  SPI.begin();           // Inicia a serial SPI para o leitor
  mfrc522.PCD_Init();    // Inicia o leitor RFID

  initWiFi();
}


void loop() {
    
  
  if (read_RFID(code_RFID)){ // Verifica se o cartao foi lido

     if(WiFi.status() == WL_CONNECTED) { // Verifica a conexao Wifi
           montaJSON();  // transforma os dados em formato JSON
           if (metodoPOSTinc()==1){      // envia os dados ao servidor   
                Serial.println(" enviou!!!!!!!!!");
           }else{
                Serial.println(" nao enviou, servidor nao disponivel!!!!!!!!!");
           }

     }else{
              Serial.printf("não conectado a wifi...");
             
     }
      delay (3000);
  }
}


       
           


