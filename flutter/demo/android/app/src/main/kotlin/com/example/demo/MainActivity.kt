package com.example.demo

import android.content.BroadcastReceiver
import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build.VERSION
import android.os.Build.VERSION_CODES
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.EventChannel
import io.flutter.plugin.common.EventChannel.EventSink
import io.flutter.plugin.common.EventChannel.StreamHandler
import io.flutter.plugin.common.MethodChannel


class MainActivity: FlutterActivity() {
    private val BATTERY_CHANNEL = "samples.flutter.io/battery"
    private val CHARGING_CHANNEL = "samples.flutter.io/charging"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        EventChannel(flutterEngine.dartExecutor, CHARGING_CHANNEL).setStreamHandler(
            object : StreamHandler {
                private var chargingStateChangeReceiver: BroadcastReceiver? = null
                override
                fun onListen(arguments: Any?, events: EventSink) {
                    chargingStateChangeReceiver = createChargingStateChangeReceiver(events)
                    registerReceiver(
                        chargingStateChangeReceiver, IntentFilter(Intent.ACTION_BATTERY_CHANGED)
                    )
                }

                override
                fun onCancel(arguments: Any?) {
                    unregisterReceiver(chargingStateChangeReceiver)
                    chargingStateChangeReceiver = null
                }
            }
        )
        MethodChannel(
            flutterEngine.dartExecutor,
            BATTERY_CHANNEL
        ).setMethodCallHandler { call, result ->
            if (call.method == "getBatteryLevel") {
                val batteryLevel = getBatteryLevel()
                if (batteryLevel != -1) {
                    result.success(batteryLevel)
                } else {
                    result.error("UNAVAILABLE", "Battery level not available.", null)
                }
            } else {
                result.notImplemented()
            }
        }
    }

    private fun createChargingStateChangeReceiver(events: EventSink): BroadcastReceiver? {
        return object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                val status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1)
                if (status == BatteryManager.BATTERY_STATUS_UNKNOWN) {
                    events.error("UNAVAILABLE", "Charging status unavailable", null)
                } else {
                    val isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING ||
                            status == BatteryManager.BATTERY_STATUS_FULL
                    events.success(if (isCharging) "charging" else "discharging")
                }
            }
        }
    }

    private fun getBatteryLevel(): Int {
        return if (VERSION.SDK_INT >= VERSION_CODES.LOLLIPOP) {
            val batteryManager = getSystemService(BATTERY_SERVICE) as BatteryManager
            batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
        } else {
            val intent = ContextWrapper(applicationContext).registerReceiver(
                null,
                IntentFilter(Intent.ACTION_BATTERY_CHANGED)
            )
            intent!!.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) * 100 /
                    intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
        }
    }
}
