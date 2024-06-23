package com.example.emoneyblog.dtos.pages;

import com.example.emoneyblog.models.documents.Blog;
import org.springframework.data.domain.Page;

import java.util.List;

public class BlogsDtoPageable extends PageDto{

    public BlogsDtoPageable(Long total, Integer totalPage, Integer currentPage, List<?> list) {
        super(total, totalPage, currentPage, list);
    }

}
