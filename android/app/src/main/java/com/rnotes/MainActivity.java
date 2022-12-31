package com.rnotes;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import android.content.res.Configuration;


public class MainActivity extends ReactActivity {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);
      switch (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) {
            case Configuration.UI_MODE_NIGHT_YES:
                setTheme(R.style.DarkTheme);
                SplashScreen.show(this, R.style.DarkTheme, true);
                break;
            case Configuration.UI_MODE_NIGHT_NO:
                setTheme(R.style.LightTheme);
                SplashScreen.show(this, R.style.LightTheme, true);
                break;
            default:
                setTheme(R.style.LightTheme);
                SplashScreen.show(this, R.style.LightTheme, true);
        }
    }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RNotes";
  }
}
