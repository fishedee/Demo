#include <tchar.h>
#include <Windows.h>

HINSTANCE _HInstance;

TCHAR _Title[] = _T("简单文本框");

TCHAR _WindowClass[] = _T("MySimpleTextBoxApp");

HFONT hGuiFont = (HFONT)::GetStockObject(DEFAULT_GUI_FONT);

ATOM _RegisterClass();

HWND _CreateWindow(int nCmdShow);

LRESULT CALLBACK _WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam);

TCHAR _TextBoxClass[] = _T("MySimpleTextBox");

ATOM _RegisterTextBoxClass();

HWND _CreateTextBoxWindow(HWND hParentWnd);

LRESULT CALLBACK _TextBoxWndProc(HWND hWnd,UINT message,WPARAM wParam,LPARAM lParam);

void _DrawText(HDC hDC);

void _SetCaretPos(HWND hWnd);

void _UpdateWindow(HWND hWnd);

void _SetImm(HWND hWnd);

#define MAINWINDOW_WIDTH 400

#define MAINWINDOW_HEIGHT 200

#define TEXTBOX_WIDTH 300

#define TEXTBOX_HEIGHT 23

#define TEXTBOX_MAXLENGTH 1024

TCHAR _String[TEXTBOX_MAXLENGTH+1]=_T("");

int _StringPosition = ::_tcslen(_String);

int APIENTRY _tWinMain(HINSTANCE hInstace,
	HINSTANCE hPrevInstace,
	LPTSTR lpCmdLine,
	int nCmdShow) {
	_HInstance = hInstace;

	_RegisterClass();

	if (_CreateWindow(nCmdShow) == NULL) {
		return FALSE;
	}

	MSG msg;
	while (::GetMessage(&msg, NULL, 0, 0)) {
		::TranslateMessage(&msg);
		::DispatchMessage(&msg);
	}
	return (int)msg.wParam;
}

ATOM _RegisterClass(){
	WNDCLASSEX wc;
	::ZeroMemory(&wc,sizeof(wc));

	wc.cbSize = sizeof(wc);
	wc.style = CS_HREDRAW | CS_VREDRAW;
	wc.hInstance = _HInstance;
	wc.hbrBackground = (HBRUSH)(COLOR_APPWORKSPACE+1);
	wc.lpszClassName = _WindowClass;
	wc.lpfnWndProc = _WndProc;

	return ::RegisterClassEx(&wc);
}

HWND _CreateWindow(int nCmdShow) {
	HWND hWnd = ::CreateWindow(_WindowClass,
		_Title,
		WS_OVERLAPPEDWINDOW,
		CW_USEDEFAULT,
		CW_USEDEFAULT,
		MAINWINDOW_WIDTH,
		MAINWINDOW_HEIGHT,
		NULL,
		NULL,
		_HInstance,
		NULL);
	if (hWnd == NULL) {
		return NULL;
	}

	::ShowWindow(hWnd,nCmdShow);
	::UpdateWindow(hWnd);
	return hWnd;
}

LRESULT CALLBACK _WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam) {
	static HWND hTextBoxWnd;
	switch (message) {
	case WM_CREATE:
		_RegisterTextBoxClass();
		hTextBoxWnd = _CreateTextBoxWindow(hWnd);
		break;
	case WM_ACTIVATE:
		::SetFocus(hTextBoxWnd);
		break;
	case WM_SETCURSOR:
		static HCURSOR hCursor = LoadCursor(NULL,IDC_ARROW);
		::SetCursor(hCursor);
		break;
	case WM_DESTROY:
		::PostQuitMessage(0);
		break;
	default:
		return ::DefWindowProc(hWnd, message, wParam, lParam);
	}
	return (LRESULT)0;
}

ATOM _RegisterTextBoxClass() {
	WNDCLASSEX wc;
	::ZeroMemory(&wc, sizeof(wc));

	wc.cbSize = sizeof(wc);
	wc.style = CS_HREDRAW | CS_VREDRAW| CS_DBLCLKS;
	wc.hInstance = _HInstance;
	wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
	wc.lpszClassName = _TextBoxClass;
	wc.lpfnWndProc = _TextBoxWndProc;

	return ::RegisterClassEx(&wc);
}

HWND _CreateTextBoxWindow(HWND hParentWnd) {
	RECT parentWndRect;

	::GetClientRect(hParentWnd,&parentWndRect);
	int left = (parentWndRect.right - TEXTBOX_WIDTH) / 2;
	int top = (parentWndRect.bottom-TEXTBOX_HEIGHT)/2;
	HWND hWnd = ::CreateWindow(_TextBoxClass,
		NULL,
		WS_CHILDWINDOW|WS_VISIBLE,
		left,
		top,
		TEXTBOX_WIDTH,
		TEXTBOX_HEIGHT,
		hParentWnd,
		NULL,
		_HInstance,
		NULL);
	if (hWnd == NULL) {
		return NULL;
	}

	return hWnd;
}

LRESULT CALLBACK _TextBoxWndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam) {
	static HWND hTextBoxWnd;
	switch (message) {
	case WM_PAINT: {
		static PAINTSTRUCT ps;
		static RECT rect;
		HDC hdc = ::BeginPaint(hWnd, &ps);
		::GetClientRect(hWnd, &rect);
		::DrawEdge(hdc, &rect, EDGE_SUNKEN, BF_RECT);
		_DrawText(hdc);
		::EndPaint(hWnd, &ps); 
		}
		break;
	case WM_SETFOCUS: {
		::CreateCaret(hWnd, (HBITMAP)NULL, 1, TEXTBOX_HEIGHT - 5);
		_SetCaretPos(hWnd);
		::ShowCaret(hWnd); 
		}
		break;
	case WM_KILLFOCUS: {
		::HideCaret(hWnd);
		::DestroyCaret(); 
		}
		 break;
	case WM_SETCURSOR:{
		static HCURSOR hCursor = ::LoadCursor(NULL,IDC_IBEAM);
		::SetCursor(hCursor);
		}
		break;
		/*
		//TODO 输入法处理预览字处理
	case WM_IME_COMPOSITION:
	case WM_IME_STARTCOMPOSITION:
	case WM_IME_ENDCOMPOSITION:
	https://blog.csdn.net/yishow/article/details/7268013
	使用ImmSetCompositionWindow实现光标跟随
	https://www.2cto.com/kf/201603/492370.html
	https://github.com/chikatoike/IMESupport/blob/master/hook/imesupport_hook.c
		*/
	case WM_IME_STARTCOMPOSITION:
	case WM_IME_COMPOSITION:
		_SetImm(hWnd);
		return ::DefWindowProc(hWnd, message, wParam, lParam);
	case WM_CHAR:{
		TCHAR code = (TCHAR)wParam;
		int len = ::_tcslen(_String);
		if (code < (TCHAR)' ' || len >= TEXTBOX_MAXLENGTH) {
			return 0;
		}
		::MoveMemory(_String+_StringPosition+1,
			_String+_StringPosition,
			(len-_StringPosition+1)*sizeof(TCHAR));

		_String[_StringPosition++] = code;
		_UpdateWindow(hWnd);
		_SetCaretPos(hWnd);
		}
		break;
	case WM_KEYDOWN: {
		TCHAR code2 = (TCHAR)wParam;
		switch (code2) {
		case VK_LEFT:
			if (_StringPosition > 0) {
				_StringPosition--;
			}
			break;
		case VK_RIGHT:
			if (_StringPosition < (int)::_tcslen(_String)) {
				_StringPosition++;
			}
			break;
		case VK_HOME:
			_StringPosition = 0;
			break;
		case VK_END:
			_StringPosition = ::_tcslen(_String);
			break;
		case VK_BACK:
			if (_StringPosition > 0) {
				::MoveMemory(
					_String + _StringPosition - 1,
					_String + _StringPosition,
					(::_tcslen(_String) - _StringPosition + 1) * sizeof(TCHAR)
					);
				_StringPosition--;
				_UpdateWindow(hWnd);
			}
			break;
		case VK_DELETE:
			int len = ::_tcslen(_String);
			if (_StringPosition < len) {
				::MoveMemory(
					_String + _StringPosition,
					_String + _StringPosition + 1,
					(::_tcslen(_String) - _StringPosition + 1) * sizeof(TCHAR)
					);
				_UpdateWindow(hWnd);
			}
			break;
		}
		_SetCaretPos(hWnd);
		}
		break;
	case WM_LBUTTONDOWN: {
		int x = LOWORD(lParam);
		HDC hdc2 = ::GetDC(hWnd);
		::SelectObject(hdc2, hGuiFont);
		int strLen = ::_tcslen(_String);
		int strPos = 0;
		SIZE size;
		for (strPos = 0; strPos < strLen; strPos++) {
			::GetTextExtentPoint(hdc2, _String, strPos, &size);
			if (size.cx + 4 >= x) {
				break;
			}
		}
		_StringPosition = strPos;
		::GetTextExtentPoint(hdc2, _String, strPos, &size);
		::SetCaretPos(size.cx + 4, 3);
		::ReleaseDC(hWnd, hdc2);
		}
		break;
	default:
		return ::DefWindowProc(hWnd, message, wParam, lParam);
	}
	return (LRESULT)0;
}

void _UpdateWindow(HWND hWnd) {
	RECT rect;
	::GetClientRect(hWnd,&rect);
	::InvalidateRect(hWnd,&rect,true);
	::UpdateWindow(hWnd);
}

void _DrawText(HDC hDc) {
	int len = ::_tcslen(_String);
	HFONT hGuiFont = (HFONT)::GetStockObject(DEFAULT_GUI_FONT);
	::SelectObject(hDc, hGuiFont);
	::TextOut(hDc,4,6,_String,len);
}

void _SetCaretPos(HWND hWnd) {
	HDC hDC = ::GetDC(hWnd);
	SIZE size;
	::SelectObject(hDC, hGuiFont);
	::GetTextExtentPoint(hDC,_String,_StringPosition,&size);
	::SetCaretPos(4+size.cx,3);
	::ReleaseDC(hWnd,hDC);

	POINT point;
	GetCaretPos(&point);//获取输入光标位置，存入point结构体
}

void _SetImm(HWND hWnd) {
	HIMC hIMC = ImmGetContext(hWnd);

	if (hIMC) {
		POINT point;
		GetCaretPos(&point);
		COMPOSITIONFORM Composition;
		Composition.dwStyle = CFS_POINT;
		Composition.ptCurrentPos.x = point.x;
		Composition.ptCurrentPos.y = point.y;
		ImmSetCompositionWindow(hIMC, &Composition);//设置

		ImmReleaseContext(hWnd, hIMC);//释放
	}
	
}



