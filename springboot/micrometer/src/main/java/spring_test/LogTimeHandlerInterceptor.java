package spring_test;


import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Metrics;
import io.micrometer.core.instrument.Timer;
import lombok.extern.slf4j.Slf4j;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletResponse;
import java.time.Duration;

@Component
@Slf4j
public class LogTimeHandlerInterceptor extends HandlerInterceptorAdapter {
    /*
    private static final Counter COUNTER = Counter.builder("Http请求统计")
            .tag("HttpCount", "HttpCount")
            .description("Http请求统计")
            .register(Metrics.globalRegistry);

    private static final Timer requestTimer = Timer.builder("timer")
            .tag("timer","timer")
            .description("timer")
            .register(Metrics.globalRegistry);*/

    //全局注入
    @Autowired
    private MeterRegistry meterRegistry;

    private ThreadLocal<Long> startTimeThreadLocal = new ThreadLocal<>();
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        long start = System.currentTimeMillis();
        startTimeThreadLocal.set(start);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
        //加全局请求数
        meterRegistry.counter("http.requests").increment();

        if (handler instanceof HandlerMethod == false) {
            return;
        }
        try {
            Long startTime = startTimeThreadLocal.get();
            Long endTime = System.currentTimeMillis();

            StringBuilder logs = new StringBuilder();              //可在此处获取当前用户放日志信息里
            logs.append(" IP:").append(request.getRemoteAddr());//获取请求地址IP 自己实现
            if( ex == null ){
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

            String uri = request.getRequestURI();
            meterRegistry.timer("http.requests.uri","uri",uri).record(Duration.ofMillis(time));
        } finally {
            startTimeThreadLocal.remove();
        }
    }
}