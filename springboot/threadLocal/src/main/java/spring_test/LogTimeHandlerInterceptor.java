package spring_test;


import lombok.extern.apachecommons.CommonsLog;
import lombok.extern.slf4j.Slf4j;
import javax.servlet.http.HttpServletRequest;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletResponse;

@Component
@Slf4j
public class LogTimeHandlerInterceptor extends HandlerInterceptorAdapter { // 单例多线程 开始时间绑定在线程上
    private ThreadLocal<Long> startTimeThreadLocal = new ThreadLocal<>();

    private ThreadLocal<Exception> realException = new ThreadLocal<>();
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        long start = System.currentTimeMillis();
        startTimeThreadLocal.set(start);
        return true;
    }

    public void setException(Exception e){
        realException.set(e);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
        if (handler instanceof HandlerMethod == false) {
            return;
        }
        try {
            Long startTime = startTimeThreadLocal.get();
            Long endTime = System.currentTimeMillis();

            StringBuilder logs = new StringBuilder();              //可在此处获取当前用户放日志信息里
            logs.append(" IP:").append(request.getRemoteAddr());//获取请求地址IP 自己实现
            if( ex == null ){
                log.info("thread id: {},realException {}",Thread.currentThread().getId(),realException.get()!=null?realException.get().getMessage():"");
                //一般输出,对于Controller出现的异常,应该配合GlobalExceptionhandler来处理
                HandlerMethod method = (HandlerMethod) handler;
                String className = method.getBeanType().getName();
                String methodName = method.getMethod().getName();
                logs.append(" ").append(className).append("::").append(methodName);
            }else{
                //只能捕捉意味的异常,不能捕捉普通controller的异常
                logs.append(" ").append(ex.getClass()).append("::").append(ex.getMessage());
            }
            long time = endTime - startTime;
            logs.append(" 耗时：").append(time).append("(ms)");
            log.info(logs.toString());
        } finally {
            startTimeThreadLocal.remove();
        }
    }
}