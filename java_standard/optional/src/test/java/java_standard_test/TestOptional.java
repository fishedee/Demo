package java_standard_test;

import org.junit.jupiter.api.Test;

import java.util.NoSuchElementException;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

public class TestOptional {

    @Test
    public void testEmpty(){
        Optional<Integer> result = Optional.empty();

        assertEquals(result.isPresent(),false);
        assertThrows(NoSuchElementException.class,()->{
            result.get();
        });
    }

    @Test
    public void testOf(){
        Optional<Integer> result = Optional.of(123);
        assertEquals(result.isPresent(),true);
        assertEquals(result.get(),123);
    }
}
