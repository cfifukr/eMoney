package com.example.emoneyblog.controllers;

import com.example.emoneyblog.dtos.pages.BlogsDtoPageable;

import com.example.emoneyblog.dtos.reguests.BlogDto;
import com.example.emoneyblog.dtos.responses.BlogResponseDto;
import com.example.emoneyblog.models.documents.Blog;

import com.example.emoneyblog.services.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<BlogsDtoPageable> getBlogs(Pageable pageable){

        List<Blog> blogs = blogService.getBlogsPage(pageable).stream().toList();
        long numberBlogs = blogService.getNumberOfBlogs();

        BlogsDtoPageable response = new BlogsDtoPageable(numberBlogs,
                (int) Math.ceilDiv(numberBlogs, pageable.getPageSize()),
                pageable.getPageNumber(),
                blogs.stream().map(i -> BlogResponseDto.getDto(i)).toList()

                );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{blog_id}")
    public ResponseEntity<BlogResponseDto> getBlogById(@PathVariable Long blog_id){

        Blog blog = blogService.getBlogById(blog_id);

        return ResponseEntity.ok(BlogResponseDto.getDto(blog));
    }

    @PostMapping
    public ResponseEntity<BlogResponseDto> addBlog(
            @RequestBody BlogDto blogDto)
}
