/*
 * This file is generated by jOOQ.
 */
package com.jooq_test.app.codegen;


import com.jooq_test.app.codegen.tables.Author;

import java.util.Arrays;
import java.util.List;

import org.jooq.Catalog;
import org.jooq.Table;
import org.jooq.impl.SchemaImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Library extends SchemaImpl {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>library</code>
     */
    public static final Library LIBRARY = new Library();

    /**
     * The table <code>library.author</code>.
     */
    public final Author AUTHOR = Author.AUTHOR;

    /**
     * No further instances allowed
     */
    private Library() {
        super("library", null);
    }


    @Override
    public Catalog getCatalog() {
        return DefaultCatalog.DEFAULT_CATALOG;
    }

    @Override
    public final List<Table<?>> getTables() {
        return Arrays.<Table<?>>asList(
            Author.AUTHOR);
    }
}
