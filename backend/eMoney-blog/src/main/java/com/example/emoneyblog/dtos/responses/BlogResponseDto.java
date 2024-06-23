package com.example.emoneyblog.dtos.responses;

import com.example.emoneyblog.models.Component;
import com.example.emoneyblog.models.documents.Blog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlogResponseDto{

    private Long id;
    private String username;
    private String title;
    private String image_link;
    private LocalDateTime lastModificationDate;
    private List<Component> components;
    private Boolean approved;

    public static BlogResponseDto getDto(Blog blog) {
        BlogResponseDto res = BlogResponseDto.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .username(blog.getUsername())
                .image_link(blog.getImage_link())
                .lastModificationDate(blog.getLastModificationDate())
                .components(blog.getComponents())
                .approved(blog.getApproved())
                .build();
        return res;
    }
}
