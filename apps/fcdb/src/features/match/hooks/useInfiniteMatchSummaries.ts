import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MatchQueries } from "@/entities/match/model/queries";
import {
  convertMatchInfo,
  convertPlayers,
  covertMatchStatus,
} from "@/entities/match/lib/getMatchInfo";
import {
  MatchDetailResponse,
  UserProfileResponse,
} from "@/entities/fc-database/types";

/**
 * @description 매치 경기 정보 조회
 *
 * @param ouid 유저 고유 아이디
 * @param matchList 매치 리스트
 * @param profileInfo 유저 프로필 정보
 */
export function useInfiniteMatchSummaries(
  ouid: string,
  matchList: MatchDetailResponse[],
  profileInfo: UserProfileResponse
) {
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(MatchQueries.infinityMatchQuery(ouid, matchList));

  const infiniteSummaries = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) =>
      page.map((match) => {
        const { matchInfo } = match;
        const sortedMatchInfo = matchInfo.sort((a, b) => {
          return a.nickname === profileInfo.nickname
            ? -1
            : b.nickname === profileInfo.nickname
              ? 1
              : 0;
        });

        const info = convertMatchInfo(sortedMatchInfo);
        const matchStatus = covertMatchStatus(match);
        const matchPlayers = convertPlayers(sortedMatchInfo);

        return {
          matchInfo: info,
          matchStatus,
          matchPlayers,
          matches: match,
        };
      })
    );
  }, [data]);

  const initialData = useMemo(() => {
    return infiniteSummaries.slice(0, 20);
  }, [matchList]);

  const loading = useMemo(() => {
    return isLoading || isFetchingNextPage;
  }, [isLoading, isFetchingNextPage]);

  return {
    infiniteSummaries,
    initialData,
    fetchNextPage,
    hasNextPage,
    loading,
  };
}
