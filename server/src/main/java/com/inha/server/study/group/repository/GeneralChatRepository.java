package com.inha.server.study.group.repository;

import com.inha.server.study.group.model.GeneralChat;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralChatRepository extends MongoRepository<GeneralChat, String> {

    List<GeneralChat> findByGroupId(String groupId);

    Page<GeneralChat> findAllByGroupId(String groupId, Pageable pageable);

}
