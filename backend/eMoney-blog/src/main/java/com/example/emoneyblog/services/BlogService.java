package com.example.emoneyblog.services;

import com.example.emoneyblog.models.documents.Blog;
import com.example.emoneyblog.repositories.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;

    @Transactional
    public Blog saveOrUpdateBlog(Blog blog){
        return blogRepository.save(blog);
    }

    @Transactional
    public void deleteBlogById(Long id){
        blogRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Blog getBlogById(Long id){
        Optional<Blog> blog = blogRepository.findById(id);
        return  blog.orElse(null);
    }


    @Transactional
    public long  getNumberOfBlogs(){
        return blogRepository.count();
    }

    @Transactional
    public Page<Blog> getBlogsPage(Pageable pageable){
        return blogRepository.findAll(pageable);
    }

}
