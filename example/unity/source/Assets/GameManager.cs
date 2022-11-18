using System.Collections;
using System.Collections.Generic;

using UnityEngine;
using UnityEngine.UI;

using System;
 
using System.Runtime.InteropServices;
 

public class GameManager : MonoBehaviour
{
    public Text count;
    public Button incBtn;
    public Button decBtn;

    private int num = 0;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void Inc(){
//     num++;
//    count.text = num.ToString();
    if (Application.platform == RuntimePlatform.Android)
        {
            using (AndroidJavaClass jc = new AndroidJavaClass("com.azesmwayreactnativeunity.ReactNativeUnityViewManager"))
            {
                jc.CallStatic("sendMessageToMobileApp", "inc");
            }
        }
        else if (Application.platform == RuntimePlatform.IPhonePlayer)
        {
#if UNITY_IOS && !UNITY_EDITOR
            NativeAPI.sendMessageToMobileApp("inc");
#endif
        }
    }
      public void Dec(){
    //     num--;
    //  count.text = num.ToString();
      if (Application.platform == RuntimePlatform.Android)
        {
            using (AndroidJavaClass jc = new AndroidJavaClass("com.azesmwayreactnativeunity.ReactNativeUnityViewManager"))
            {
                jc.CallStatic("sendMessageToMobileApp", "dec");
            }
        }
        else if (Application.platform == RuntimePlatform.IPhonePlayer)
        {
#if UNITY_IOS && !UNITY_EDITOR
            NativeAPI.sendMessageToMobileApp("dec");
#endif
        }
    }
     public void MessageRN(string message)
    {
        print("UNITY Recived message: " + message);
        if(message=="inc")
        { num++;}
        if(message=="dec")
        { num--;}
         count.text = num.ToString();
    }
}
