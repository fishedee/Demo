package com.fishedee;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.logging.Log;
import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.apache.maven.project.MavenProject;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@Mojo(name="go")
public class MyMojo
    extends AbstractMojo
{

    @Parameter(
            property = "project",
            required = true,
            readonly = true
    )
    private MavenProject mavenProject;


    @Parameter(
            property = "codegen.outputDir",
            defaultValue = "src/main/java"
    )
    private String outputDir;

    @Parameter(
            property = "codegen.packageName",
            required = true
    )
    private String packageName;

    public void execute()
        throws MojoExecutionException
    {
        Log log = getLog();

        log.info("baseDir "+mavenProject.getBasedir());
        log.info("outputDir "+outputDir);
        log.info("packageName "+packageName);
    }
}
