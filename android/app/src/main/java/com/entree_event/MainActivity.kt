package com.entree_event

import android.os.Bundle  // 추가: Bundle 클래스 import
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView

class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "Entree_Event"

    /**
     * Override onCreate to initialize the GestureHandler.
     */
    override fun onCreate(savedInstanceState: Bundle?) {  // Bundle 클래스 참조 오류 해결
        super.onCreate(null)
    }

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flag [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        /**DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)*/
        object : ReactActivityDelegate(this, mainComponentName) {
            override fun createRootView(): RNGestureHandlerEnabledRootView {
                return RNGestureHandlerEnabledRootView(this@MainActivity)
            }
        }
}
