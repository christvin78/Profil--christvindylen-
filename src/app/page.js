"use client";

import React, { useState } from "react";
import {
  Typography,
  Divider,
  Button,
  Space,
  Card,
  Avatar,
  Modal,
  Input,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const avatarVariants = {
  float: {
    y: [0, -10, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  hoverRotate: {
    rotate: 360,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const eyeVariants = {
  open: { scaleY: 1 },
  close: {
    scaleY: 0.1,
    transition: { duration: 0.2, yoyo: Infinity, repeatDelay: 3 },
  },
};

const flyingTextVariants = {
  initial: { y: 0, opacity: 1 },
  animate: {
    y: [0, -8, 0, 8, 0],
    opacity: [1, 0.7, 1, 0.7, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Page() {
  // Hanya satu profil
  const [students, setStudents] = useState([
    {
      id: 1,
      fullName: "John Doe",
      description:
        "Creative and passionate Computer Science student specializing in modern web development, UI/UX design, and interactive experiences.",
      avatar: null,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formFullName, setFormFullName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const showEditModal = (student) => {
    setFormFullName(student.fullName);
    setFormDescription(student.description);
    setEditId(student.id);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formFullName.trim() || !formDescription.trim()) {
      message.error("Nama dan deskripsi tidak boleh kosong!");
      return;
    }
    setStudents((prev) =>
      prev.map((s) =>
        s.id === editId
          ? { ...s, fullName: formFullName, description: formDescription }
          : s
      )
    );
    setIsModalOpen(false);
    message.success("Profil berhasil diperbarui!");
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Apakah Anda yakin ingin menghapus profil ini?",
      okText: "Ya, hapus",
      okType: "danger",
      cancelText: "Batal",
      onOk() {
        setStudents((prev) => prev.filter((s) => s.id !== id));
        message.success("Profil telah dihapus.");
      },
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(-45deg, #667eea, #764ba2, #6a11cb, #2575fc)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 20px",
        gap: 20,
        flexWrap: "wrap",
      }}
    >
      {students.length === 0 && (
        <Typography.Title style={{ color: "white" }} level={3}>
          Tidak ada profil
        </Typography.Title>
      )}

      {students.map((student) => (
        <motion.div
          key={student.id}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: "100%", maxWidth: "420px" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Card
              style={{
                textAlign: "center",
                borderRadius: "20px",
                padding: "20px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                color: "#fff",
                marginBottom: 20,
              }}
              bodyStyle={{ padding: "30px" }}
            >
              <motion.div
                variants={avatarVariants}
                animate="float"
                whileHover="hoverRotate"
                style={{
                  display: "inline-block",
                  padding: "5px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #ff6ec4, #7873f5)",
                  marginBottom: "15px",
                  boxShadow: "0 4px 15px rgba(255, 110, 196, 0.5)",
                  position: "relative",
                }}
              >
                <Avatar
                  size={100}
                  src={student.avatar}
                  icon={!student.avatar && <UserOutlined />}
                  style={{
                    border: "3px solid white",
                    backgroundColor: "#f0f0f0",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
                {!student.avatar && (
                  <>
                    <motion.div
                      variants={eyeVariants}
                      animate="open"
                      style={{
                        position: "absolute",
                        top: 50,
                        left: 30,
                        width: 10,
                        height: 10,
                        backgroundColor: "#000",
                        borderRadius: "50%",
                        originY: 0.5,
                        zIndex: 3,
                      }}
                    />
                    <motion.div
                      variants={eyeVariants}
                      animate="open"
                      style={{
                        position: "absolute",
                        top: 50,
                        right: 30,
                        width: 10,
                        height: 10,
                        backgroundColor: "#000",
                        borderRadius: "50%",
                        originY: 0.5,
                        zIndex: 3,
                      }}
                    />
                  </>
                )}
              </motion.div>

              {/* Animasi tulisan terbang dan getar halus */}
              <motion.div
                variants={flyingTextVariants}
                initial="initial"
                animate="animate"
              >
                <Title
                  level={2}
                  style={{ color: "white", marginBottom: "10px" }}
                >
                  {student.fullName || "(Tidak ada nama)"}
                </Title>
                <Paragraph
                  style={{
                    fontSize: "16px",
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: "20px",
                  }}
                >
                  {student.description || "(Tidak ada deskripsi)"}
                </Paragraph>
              </motion.div>

              <Divider style={{ borderColor: "rgba(255,255,255,0.3)" }} />

              <Space>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    type="primary"
                    onClick={() => showEditModal(student)}
                    style={{
                      background:
                        "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                      border: "none",
                    }}
                  >
                    Edit
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(student.id)}
                    style={{
                      background:
                        "linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)",
                      border: "none",
                    }}
                  >
                    Delete
                  </Button>
                </motion.div>
              </Space>
            </Card>
          </motion.div>
        </motion.div>
      ))}

      <Modal
        title="Edit Profil"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        okText="Simpan"
        cancelText="Batal"
      >
        <Input
          placeholder="Nama lengkap"
          value={formFullName}
          onChange={(e) => setFormFullName(e.target.value)}
          style={{ marginBottom: 15 }}
        />
        <Input.TextArea
          rows={4}
          placeholder="Deskripsi diri"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
        />
      </Modal>

      <style jsx>{`
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
