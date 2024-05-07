import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import EditIcon from '../SVG/EditIcon';
import StarIcon from '../SVG/StartIcon';
import { Dimensions } from 'react-native';
import Piece from '../components/Piece';
import * as ChessLib from 'chess.js';
import { useDetectionResult } from '../context/DetectionResultContext';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const BoardView = () => {
  const router = useRouter();
  return (
    <View>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Pressable
              onPress={() => {
                router.push('/');
              }}
              style={({ pressed }) => [
                {
                  width: 24,
                  height: 24,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <ChevronLeft size={24} color='#fff' strokeWidth={2.5} />
            </Pressable>
          </View>
          <View>
            <Text style={styles.title}>Chesslysis</Text>
            <Text style={styles.title2}>Chess position scanner</Text>
          </View>
        </View>
        <View style={styles.groupBtn}>
          <Pressable>
            <EditIcon />
          </Pressable>
          <Pressable>
            <StarIcon />
          </Pressable>
        </View>
      </View>
      <View style={styles.boardContainer}>
        <Board />
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/board-result')}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
              padding: 10,
              borderRadius: 5,
            }}
          >
            Show Detection Results
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BoardView;

const Letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

type BoardPositions = (
  | ChessLib.PieceSymbol
  | Uppercase<ChessLib.PieceSymbol>
  | null
)[][];

const Board = () => {
  const [board, setBoard] = useState<BoardPositions>(
    Array(8).fill(Array(8).fill(null))
  );

  const deviceWidth = Dimensions.get('window').width;
  const width = getBoardWidth(deviceWidth);
  const { result } = useDetectionResult();

  React.useEffect(() => {
    if (!result) return;
    const board = result.positions as BoardPositions;
    setBoard(board);
  }, [result]);

  return (
    <View>
      <View
        style={{
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <BoardNumbers height={width} />
          <View>
            {board.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {row.map((name, index) => (
                  <View
                    key={index + rowIndex}
                    style={{
                      width: width,
                      height: width,
                      backgroundColor:
                        (index + rowIndex) % 2 === 0 ? '#E8EDF9' : '#5369A2',
                    }}
                  >
                    <Piece name={name} width={width} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        <BoardAplhas width={width} />
      </View>
    </View>
  );
};

const BoardAplhas = ({ width }: { width: number }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
      }}
    >
      {Letters.map((letter, index) => (
        <View
          key={index}
          style={{
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#E6E6E6',
              fontSize: 10,
              fontWeight: '400',
            }}
          >
            {letter}
          </Text>
        </View>
      ))}
    </View>
  );
};

const BoardNumbers = ({ height }: { height: number }) => {
  return (
    <View>
      {Letters.map((_, index) => (
        <View
          key={index}
          style={{
            justifyContent: 'center',
            height,
          }}
        >
          <Text
            style={{
              color: '#E6E6E6',
              fontSize: 10,
              fontWeight: '400',
              height: 12.4,
            }}
          >
            {8 - index}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#161A30',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  title2: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '400',
  },
  groupBtn: {
    flexDirection: 'row',
    gap: 17,
  },
  boardContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

function getBoardWidth(deviceWidth: number) {
  if (deviceWidth < 400) {
    return 45.5;
  }
  if (deviceWidth < 600) {
    return 50;
  }
  if (deviceWidth < 800) {
    return 60;
  }
  if (deviceWidth < 1000) {
    return 70;
  }
  return 80;
}