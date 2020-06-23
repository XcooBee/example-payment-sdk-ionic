import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonFooter, IonRow, IonCol, IonItem, IonInput, IonImg } from '@ionic/react';
import React, {useEffect, useState } from 'react';
import { BrowserXcooBeePaymentSDK } from '@xcoobee/payment-sdk';
import './Home.css';

// init XcooBee 
// TODO: replace the values for campaignId and formId with values from your XcooBee account Project
const sdk = new BrowserXcooBeePaymentSDK({ campaignId: "test", formId: "test" });



const Home: React.FC = () => {

  const [chargeAmount, setNumber] = useState<number>(123.00);  
  const [qr, setQr] = useState<string>();

  useEffect(() => {
    sdk.createPayQr({ amount: chargeAmount, reference: "Order" }, 300).then(base64 => setQr(base64));
    }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contactless Payment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="myphoto">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Contactless Payment</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow >
          <IonCol className="ion-text-center">
            How much would you like to charge?
            <IonItem>
              <IonInput type="number" value={chargeAmount} placeholder="Enter Amount" onIonChange={e => setNumber(parseInt(e.detail.value!, 10))}></IonInput>
            </IonItem>            
            <IonButton color="primary" onClick={e => {sdk.createPayQr({ amount: chargeAmount, reference: "Order" }, 300).then(base64 => setQr(base64));
    }}>Generate</IonButton>
          </IonCol>
        </IonRow>
        
        {/* qr image space */}
        <div className="vertical-center"> 
          <div className="center"> 
            <IonImg src={qr} className="ion-align-self-end" />        
          </div> 
        </div>

      </IonContent>
      <IonFooter>
        <b>https://www.xcoobee.com</b>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
