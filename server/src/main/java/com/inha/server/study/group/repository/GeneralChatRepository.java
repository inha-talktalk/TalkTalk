package com.inha.server.study.group.repository;

import com.inha.server.study.group.model.GeneralChat;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface GeneralChatRepository extends ReactiveMongoRepository<GeneralChat, String> {

    @Tailable
    @Query("{groupId: ?0}")
    Flux<GeneralChat> findByGroupId(String groupId);

}
