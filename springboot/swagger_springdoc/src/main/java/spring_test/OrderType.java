package spring_test;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(enumAsRef = true)
public enum OrderType {
    DIRECT,
    PROXY,
}
