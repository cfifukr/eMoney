package com.example.emoneyblog.dtos.pages;

import com.example.emoneyblog.models.documents.Blog;

import java.util.List;

abstract class PageDto {
    Long total;
    Integer totalPage;
    Integer currentPage;
    List<?> list;

    public PageDto(Long total, Integer totalPage, Integer currentPage, List<?> list) {
        this.total = total;
        this.totalPage = totalPage;
        this.currentPage = currentPage;
        this.list = list;
    }

}
