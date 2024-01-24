import 'package:flutter/material.dart';

class ListenerDemo extends StatefulWidget {
  const ListenerDemo({super.key});

  @override
  State<ListenerDemo> createState() => _PointerMoveIndicatorState();
}

class _PointerMoveIndicatorState extends State<ListenerDemo> {
  PointerEvent? _event;

  @override
  Widget build(BuildContext context) {
    return Align(
      child: Listener(
        child: Container(
          alignment: Alignment.center,
          color: Colors.blue,
          width: 300.0,
          height: 150.0,
          child: Text(
            '${_event?.localPosition ?? ''}',
            style: const TextStyle(color: Colors.white),
          ),
        ),
        onPointerDown: (PointerDownEvent event) =>
            setState(() => _event = event),
        onPointerMove: (PointerMoveEvent event) =>
            setState(() => _event = event),
        onPointerUp: (PointerUpEvent event) => setState(() => _event = event),
      ),
    );
  }
}
