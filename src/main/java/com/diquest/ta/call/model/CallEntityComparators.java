package com.diquest.ta.call.model;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

import com.diquest.ta.call.model.paging.Direction;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

public final class CallEntityComparators {

    @EqualsAndHashCode
    @AllArgsConstructor
    @Getter
    static class Key {
        String name;
        Direction dir;
    }

    static Map<Key, Comparator<CallEntity>> map = new HashMap<>();

    static {
        map.put(new Key("name", Direction.asc), Comparator.comparing(CallEntity::getRFileNm));
        map.put(new Key("name", Direction.desc), Comparator.comparing(CallEntity::getRFileNm)
                .reversed());

        map.put(new Key("start_date", Direction.asc), Comparator.comparing(CallEntity::getYyyymmdd));
        map.put(new Key("start_date", Direction.desc), Comparator.comparing(CallEntity::getYyyymmdd)
                .reversed());

        map.put(new Key("position", Direction.asc), Comparator.comparing(CallEntity::getRUsrId));
        map.put(new Key("position", Direction.desc), Comparator.comparing(CallEntity::getRUsrId)
                .reversed());

        map.put(new Key("salary", Direction.asc), Comparator.comparing(CallEntity::getRUsrNm));
        map.put(new Key("salary", Direction.desc), Comparator.comparing(CallEntity::getRUsrNm)
                .reversed());

    }

    public static Comparator<CallEntity> getComparator(String name, Direction dir) {
        return map.get(new Key(name, dir));
    }

    private CallEntityComparators() {
    }
}